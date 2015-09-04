/**
 * A simple class to make a form submit ajax and handle json response.
 *
 * @project     AjaxForm
 * @author      Alberto Boni
 * @version     0.1
 * @website     http://www.bonix.co
 */
function AjaxForm(params)
{
    this._lock = false;

    // TODO: make this overwritable
    this.ajax_icons = {
        loading : '/images/ajax-loader.gif',
        success : '/images/ajax-success.',
        error :   '/images/ajax-error.png'
    };

    this._selector_prefix = 'ajaxform-';

    this.ajax_icon_selector = params.ajax_icon_selector ? params.ajax_icon_selector : ''.concat('.', this._selector_prefix, 'icon');
    this.form_selector	 	= params.form_selector;
    this.feedback_selector 	= params.feedback_selector  ? params.feedback_selector  : ''.concat('#', this._selector_prefix, 'feedback');
    this.ajax_data 			= params.ajax_data;         // TODO: merge this ajax_data with the serialized form data
    this.ajax_url           = params.ajax_url           ? params.ajax_url           : $(this.form_selector).attr('action');
    this.ajax_method        = params.ajax_method          ? params.ajax_method      : $(this.form_selector).attr('method');
    this.validation 		= params.validation           ? params.validation       : function() {return true};
    this.preajax_callback 	= params.preajax_callback   ? params.preajax_callback   : function() {};
    this.success_callback 	= params.success_callback   ? params.success_callback   : function(data) {};
    this.error_callback 	= params.error_callback     ? params.error_callback     : function(data) {};

    this.submit = function()
    {
        var parent = this;

        if (parent._lock || !parent.validation())
        {
            return false;
        }

        // lock
        parent._lock = true;

        parent._clear_feedback();
        parent._display_loading_icon(parent.form_selector);
        parent.preajax_callback();

        $.ajax({
            url      : parent.ajax_url,
            type     : parent.ajax_method,
            dataType : 'json',
            data     : parent.ajax_data ? parent.ajax_data : $(parent.form_selector).serialize(),
            success  : function(data){
                parent._lock = false;

                if(data.result)
                {
                    parent._display_resul_icon(parent.form_selector, 'success');
                    parent.success_callback(data);
                }
                else
                {
                    parent._display_resul_icon(parent.form_selector, 'error');
                    parent.error_callback(data);
                }

                parent._print_feedback(data.feedback_message, false);
            },
            error: function(data){
                parent._lock = false;

                parent._display_resul_icon(parent.form_selector, 'error');

                parent.error_callback(data);
            }
        });
    };

    this._print_feedback = function(message, auto_close)
    {
        var parent = this;

        if (!message)
        {
            return false;
        }

        $(parent.feedback_selector).show().html(message);

        if (auto_close)
        {
            setTimeout(function(){
                $(parent.feedback_selector).slideUp(250, function(){
                    $(this).empty().css('display', 'block');
                })
            }, 3500);
        }
    };

    this._clear_feedback = function()
    {
        $(this.feedback_selector).empty().hide();
    };

    this._display_loading_icon = function()
    {
        selector = ''.concat(this.form_selector, ' ', this.ajax_icon_selector, ':eq(0)');
        if ($(selector).length)
        {
            $(selector).show().attr('src', this.ajax_icons.loading);
        }
    };

    this._display_resul_icon = function(type)
    {
        selector = ''.concat(this.form_selector, ' ', this.ajax_icon_selector, ':eq(0)');

        if (type != 'error' && type != 'success')
        {
            $(selector).hide();
            return;
        }

        $(selector).attr('src', this.ajax_icons[type]).show();

        setTimeout(function() {}, 2000);
    };



    // INIT FUNCTIONS

    // press [ENTER] to submit
    var parent = this;
    $(this.form_selector).find('option, select, input').keypress(function(e){
        if (e.which == 13) { parent.submit(); }
    });

    // lock smart browsers
    $(this.form_selector).attr('onsubmit', 'return false;');
}