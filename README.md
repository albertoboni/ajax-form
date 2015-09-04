# AjaxForm

A simple library to make a form submit an ajax request with it's parsed content. It came out of the need of creating 
multiple ajax binds and response treatment.


## Dependencies

Jquery +1.9


## Installation

    <script type="text-javascript" src="ajax-form.js" />


## Usage

Just create an instance of AjaxForm for each for to make it ajaxy.  

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


## Assumptions

This class assumes that all responses are json strings with the structure

    {
        success: true, 
        feedback_message: 'success!', 
    }

or

    {
        success: true, 
        feedback_message: 'success!', 
    }

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/albertoboni/bonix-benchmark. 
This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to 
the [Contributor Covenant](contributor-covenant.org) code of conduct.


## License

This script is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

