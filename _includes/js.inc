<script src="/_core/js/jquery-3.1.1.min.js"></script>
    <script src="/_core/js/foundation/foundation.min.js"></script>
    <script src="/_core/js/slick/slick.es5.min.js"></script>
    <script src="/_core/js/vendors/masonry.min.js"></script>
    <script src="/_core/js/ajf.core.min.js"></script>
	<script src="https://www.google.com/recaptcha/api.js" async defer></script>
	<script src="/_internal/js/fsl.min.js?v1.0.4"></script>
	<script src="/_internal/js/jquery.validate.min.js"></script>
<script>
$(".frmValidate").validate({
	ignore: ".ignore",
    errorContainer: $('#errorContainer'),
    errorLabelContainer: $('#errorContainer ul'),
    wrapper: 'li',
	validClass: 'success',
  email: {
    field: {
      required: true,
      email: true
    }  
  },
  submitHandler: function(form) {
    if (grecaptcha.getResponse()) {
        form.submit();
    } else {
        alert('Please confirm captcha to proceed')
    }
  }
});</script>
