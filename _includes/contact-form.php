<?php

$showForm = true;

if(array_key_exists('email', $_POST)) {

	if(isset($_POST['g-recaptcha-response']))
		$captcha=$_POST['g-recaptcha-response'];

	if(!$captcha){
		echo '<div class="error-list"><h5>You need to validate the CAPTCHA input.</h5></div>';
	}
	else {

		$response=json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6LfsYhsUAAAAAJz_6EFzPZ0FymBnPph1kApVyQ_d&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']), true);

		if($response['success'] == false)
		{
		  echo '<h2>You are spammer! Get out</h2>';
		}
		else
		{
			$showForm=false;
			$msg = 'Phone: ' . $_POST['phone'] . "\r\n";

			if (isset($_POST['company']))
				$msg .= 'Company: ' . $_POST['company'] . "\r\n";

			$msg .= $_POST['message'];

			$to      = 'tate.carden@gofsl.com,bonnie.klamar@gofsl.com';
			$subject = '[gofsl] Inquiry';
			$headers = 'From: '. $_POST['email'] . "\r\n" .
				'X-Mailer: PHP/' . phpversion() . "\r\n" .
				'Bcc: afraze@gmail.com';

			mail($to, $subject, $msg, $headers);
			echo '<span class="bg-green color-white rounded">Thank you!  We will respond to your request soon!</span>';

		}
	}
}
?>

<?php if($showForm): ?>



<form method="post" class="frmValidate">
        
    <div id="errorContainer" class="error-list">
        <h5>Please correct the following errors and try again:</h5>
        <ul />
    </div>

    <div class="row">
        <div class="small-12 medium-3 columns">
            <label for="name" class="medium-text-right middle">Your name:</label>
        </div>
        <div class="small-12 medium-9 columns">
            <input type="text" name="name" id="name" data-msg="Your name is required!" placeholder="Jane Doe" required />
        </div>
    </div>
	<div class="row">
        <div class="small-12 medium-3 columns">
            <label for="company" class="medium-text-right middle">Your company:</label>
        </div>
        <div class="small-12 medium-9 columns">
            <input type="text" name="company" id="company" />
        </div>
    </div>
    <div class="row">
        <div class="small-12 medium-3 columns">
            <label for="email" class="medium-text-right middle">Your e-mail:</label>
        </div>
        <div class="small-12 medium-9 columns">
            <input type="email" name="email" id="email" data-msg="Your e-mail is required!" placeholder="username@domain.com" required />
        </div>
    </div>
	<div class="row">
        <div class="small-12 medium-3 columns">
            <label for="phone" class="medium-text-right middle">Your phone:</label>
        </div>
        <div class="small-12 medium-9 columns">
            <input type="text" name="phone" id="phone" data-msg="Your phone number is required!" placeholder="888-555-5555" required />
        </div>
    </div>
    <div class="row">
        <div class="small-12 medium-3 columns">
            <label for="name" class="medium-text-right">Message:</label>
        </div>
        <div class="small-12 medium-9 columns">
            <textarea name="message" id="message" rows="8" cols="20" data-msg="Please tell us more about your inquiry." placeholder="We look forward to hearing from you!" required></textarea>
        </div>
    </div>
    <div class="row">
        <div class="small-12 medium-offset-3 medium-9 columns end vertical-padding-5">
            <div class="g-recaptcha" data-sitekey="6LfsYhsUAAAAAEc9G_2kXHhnyxZFy0Xc-IYZbsSR"></div>
        </div>
    </div>
    <div class="row">
        <div class="small-12 medium-offset-3 medium-9 columns end">
            <input type="submit" name="submit" class="button primary" value="Send Request"/>
        </div>
    </div>    
    
</form>


<?php endif; ?>
