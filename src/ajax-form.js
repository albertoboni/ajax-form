function AjaxForm(params)
{
    this._lock = false;

    this._selector_prefix = 'ajaxform-';

    this.form_selector	 	    = params.form_selector;
    this.feedback_selector 	    = params.feedback_selector       ? params.feedback_selector       : ''.concat('#', this._selector_prefix, 'feedback');
    this.feedback_icon_selector = params.feedback_icon_selector  ? params.feedback_icon_selector  : ''.concat('#', this._selector_prefix, 'feedback_icon');
    this.feedback_html_success  = params.feedback_html_success   ? params.feedback_html_success   : $('<img>').attr('src', 'images/ajax-success.png').prop('outerHTML');
    this.feedback_html_loading  = params.feedback_html_loading   ? params.feedback_html_loading   : $('<img>').attr('src', 'images/ajax-loading.png').prop('outerHTML');
    this.feedback_html_error    = params.feedback_html_error     ? params.feedback_html_error     : $('<img>').attr('src', 'images/ajax-error.png').prop('outerHTML');
    this.ajax_data              = params.ajax_data;         // TODO: merge this ajax_data with the serialized $form data
    this.ajax_url               = params.ajax_url                ? params.ajax_url                : $(this.form_selector).attr('action');
    this.ajax_method            = params.ajax_method             ? params.ajax_method             : $(this.form_selector).attr('method');
    this.validation             = params.validation              ? params.validation              : function() {return true};
    this.preajax_callback       = params.preajax_callback        ? params.preajax_callback        : function() {};
    this.success_callback       = params.success_callback        ? params.success_callback        : function(data) {};
    this.error_callback         = params.error_callback          ? params.error_callback          : function(data) {};

    this.$feedback_icon         = $(this.feedback_icon_selector);
    this.$form                  = $(this.form_selector);
    this.$feedback              = $(this.feedback_selector);

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
            data     : parent.ajax_data ? parent.ajax_data : parent.$form.serialize(),
            success  : function(data){
                parent._lock = false;

                if(data.result)
                {
                    parent._display_result_icon('success');
                    parent.success_callback(data);
                }
                else
                {
                    parent._display_result_icon('error');
                    parent.error_callback(data);
                }

                parent.print_feedback(data.feedback_message, false);
            },
            error: function(data){
                parent._lock = false;

                parent._display_result_icon('error');

                parent.error_callback(data);
            }
        });
    };

    this.print_feedback = function(message, auto_close)
    {
        var parent = this;

        if (!message)
        {
            return false;
        }

        this.$feedback.show().html(message);

        if (auto_close)
        {
            setTimeout(function(){
                parent.$feedback.slideUp(250, function(){
                    $(this).empty().css('display', 'block');
                })
            }, 3500);
        }
    };

    this._clear_feedback = function()
    {
        this.$feedback.empty().hide();
    };

    this._display_loading_icon = function()
    {
        if (this.$feedback_icon.length)
        {
            this.$feedback_icon.show().html(this.feedback_html_loading);
        }
    };

    this._display_result_icon = function(type)
    {
        if (!this.$feedback_icon.length)
        {
            this.$feedback_icon.hide();
        }

        switch(type)
        {
            case 'error':
                this.$feedback_icon.show().html(this.feedback_html_error);
                break;
            case 'success':
                this.$feedback_icon.show().html(this.feedback_html_success);
                break;

            default:
                this.$feedback_icon.hide();
        }

        //TODO: ability to set a timout to hide the result
        //setTimeout(function() {}, 2000);
    };



    // INIT FUNCTIONS

    // press [ENTER] to submit
    var parent = this;
    this.$form.find('option, select, input').keypress(function(e){
        if (e.which == 13) { parent.submit(); }
    });

    // lock smart browsers
    this.$form.submit(function(event){
        parent.submit();
        event.preventDefault();
    });
}
