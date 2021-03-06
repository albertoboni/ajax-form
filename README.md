# AjaxForm

A simple library to make a form submit an ajax request with it's parsed content. It came out of pure boredom at work,
doing over and over again simple ajax calls, creating multiple ajax functions to do simple tasks.

The idea is to have a class flexible enough to handle most cases of ajax calls and at the same time remain simple enough
to extend new behavior.


## Dependencies

Jquery +1.9


## Installation
You can use a package manager with this project or download the js files from `/dist/` manually. Either way, just make sure your add a reference to your html to `jquery.js` and `ajax-form.js`

```html
<script type="text/javascript" src="<path_to_js_folder>/jquery.min.js"></script>
<script type="text/javascript" src="<path_to_js_folder>/ajax-form.min.js"></script>
```

### Package managers
Just add the dependency for this repo to your `package.json` or `bower.json`:
```
{
  ...,
  "dependencies": {
      "ajax-form": "git@github.com:albertoboni/ajax-form.git"
   },
   ...
}
```


## Usage

Just create an instance of AjaxForm for each for to make it ajaxy.
The class with fetch the method and action from the target form by default, but you can override this behaviour with the
constructor options.
`AjaxForm.submit()` will be bound to the `onSubmit` event of the form, you can either submit the form or call the function straight.

```javascript
login_form = new AjaxForm({
    form_selector: 'form[name=login]',
    success_callback: function(data){
        alert("success!");
    },
    error_callback: function(){
        alert("error :'(");        
    }
});
```

```html
<form name="login" method="post" action="/login">
    <input name="username" type="text" value="" />
    <input name="password" type="password" value="" />
    <input type="submit" />
</form>
```


## Assumptions

This class assumes that all responses are json strings having at least the element "success" that indicates to the frontend
the nature of the response.

    {
        success: true,
        feedback_message: 'success!',
    }

or

    {
        success: false,
        feedback_message: 'Aww man!',
    }



## Constructor Options

| Name                   | Value    | Description |
| ---------------------- | -------- | ----- |
| form_selector          | String   | The Jquery selector for the form  |
| feedback_selector      | String   | The selector for the element that will hold the feedback message (default: `#ajaxform-feedback`) |
| feedback_icon_selector | String   | The selector for the element that will hold the feedback icon html (default: `.ajaxform-ajax_icon`) |
| feedback_html_success  | String   | The html for the success icon (default: `<img src="images/ajax-success.png" />`) |
| feedback_html_laoding  | String   | The html for the loading icon (default: `<img src="images/ajax-loading.png" />`) |
| feedback_html_error    | String   | The html for the error icon (default: `<img src="images/ajax-error.png" />`) |
| ajax_data              | Object   | To override the serialized data from the form  |
| ajax_url               | String   | To override the url from the action of the form  |
| ajax_method            | String   | To override the value method from the form (GET || POST)  |
| validation()           | Function | A validation function, that if returned false will abort the ajax call. Handy for form validation  |
| preajax_callback()     | Function | A function call done after the validation, and before the ajax call  |
| success_callback(data) | Function | Function called whenever the backend indicates success on the response (`data` param is the parsed json response) |
| error_callback(data)   | Function | Function called whenever the backend indicates failure on the response (`data` param is the parsed json response) |



## Json Response

You can send anything back on the json response, but the class expects the following entries to work:

| Name             | Value    | Description |
| ---------------- | -------- | ----- |
| success          | Boolean  | The response of the backend, it triggers `success_callback()` or `error_callback()` defined on the constructor  |
| feedback_message | String   | The feedback string to be displayed to the user, it will be printed on the element targeted by the selector `feedback_selector` |



## Instance Methods

| Method                        | Description |
| ----------------------------- | ----------- |
| submit()                                              | Do the magic and submits the form. By default it will be bound to the `onSubmit` event of the form. |
| print_feedback(String message, Boolean auto_close)    | Prints a string on the element corresponding to `feedback_selector` |



## Examples

Common usages that for this class that I ran into. You can find this and other examples in the [examples folder](https://github.com/albertoboni/ajax-form/tree/master/examples).



### Simple login form
```html
<span id="feedback_message"><!-- To be replaced --></span>

<form name="login" method="post" action="/login">
    <input name="username" type="text" placeholder="Login" />
    <input name="password" type="password" placeholder="Password" />

    <input type="submit" />
</form>

<script type="text/javascript">
    var login_form = new AjaxForm({
        form_selector       : 'form[name=login]',
        feedback_selector   : '#feedback_message',

        validation          : function()
        {
            if ($('input[name=username]').val() == '')
            {
                this.print_feedback('You need to provide a username', true);
                return false;
            }

            return true;
        },

        success_callback    : function(data)
        {
            this.print_feedback(":-D", true);
        },

        error_callback      : function()
        {
            this.print_feedback(":-'(", true);
        }
    });
</script>
```


## TODO

For the next version:
- A better name;
- More examples, MOAR!
- Make the ajax icons overwritable by the constructor;
- Dynamically create the `<img>` tag for the ajax icons;
- This would be a cool jQuery plugin, used like `$('[name=form]').ajaxForm({...});`;


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/albertoboni/ajax-form.
This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to
the [Contributor Covenant](contributor-covenant.org) code of conduct.


## License

This script is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
