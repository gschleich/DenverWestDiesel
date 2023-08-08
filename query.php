<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $phone = $_POST["phone"];
  $vehicle = $_POST["vehicle"];
  $description = $_POST["description"];
  $other = $_POST["other"];

  $to = "bluegarrett13@gmail.com"; // Replace with the recipient's email address
  $subject = "Online Form Submission";
  $message = "Name: $name\nEmail: $email\nPhone: $phone\nVehicle: $vehicle\nDescription: $description\nOther: $other";

  // Add any additional headers as needed
  $headers = "From: $email";

  if (mail($to, $subject, $message, $headers)) {
    http_response_code(200);
  } else {
    http_response_code(500);
  }
}
?>
