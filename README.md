# AjaxForm

A simple library to make a form submit an ajax request with it's parsed content. It came out of the need of creating 
multiple ajax binds and response treatment.


## Dependencies

Jquery +1.9


## Installation

    <script type="text-javascript" src="ajax-form.js" />


## Usage

Just create an instance of AjaxForm for each for to make it ajaxy. 
The class with fetch the method and action from the target form by default, but you can override this behaviour with the
constructor options.

```html
<script type="text-javascript">
    login_form = new AjaxForm({
        form_selector: 'form[name=login]',
        success_callback: function(data){
            alert("success!");
        },
        error_callback: function(){
            alert("error :'(");        
        }
    });
</script>

<form name="login" method="post" action="/login">
    <input name="username" type="text" value="" />
    <input name="password" type="password" value="" />
</form>

<a onclick="login_form.submit()">Submit!</a>
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
| ajax_icon_selector     | String   | The selector for the icon to display during loading, success and error  |
| feedback_selector      | String   | The selector for the element that will hold the feedback message  |
| ajax_data              | Object   | To override the serialized data from the form  |
| ajax_url               | String   | To override the url from the action of the form  |
| ajax_method            | String   | To override the value method from the form [GET|POST]  |
| validate()             | Function | A validation function, that if returned false will abort the ajax call. Handy for form validation  |
| preajax_callback()     | Function | A function call done after the validation, and before the ajax call  |
| success_callback(data) | Function | Function called whenever the backend indicates success on the response (`data` param is the parsed json response) |
| error_callback(data)   | Function | Function called whenever the backend indicates failure on the response (`data` param is the parsed json response) |


## Json Response


## Examples


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/albertoboni/bonix-benchmark. 
This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to 
the [Contributor Covenant](contributor-covenant.org) code of conduct.


## License

This script is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

