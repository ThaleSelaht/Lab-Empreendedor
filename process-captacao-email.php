<?php
# Include the Autoloader (see "Libraries" for install instructions)

require 'vendor/autoload.php';
use Mailgun\Mailgun;

$data = array(); // array to pass back data

  // if there are no errors, return a message
  $data['messageSuccess'] = 'Hey! Obrigado por entrar em contato. Retornaremos a mensagem em breve.';
  // CHANGE THE TWO LINES BELOW
  /*$email_to = 'beto9.silva@gmail.com';*/
  $email_to = 'thalespizza@gmail.com';
  $email_from = $_POST['email'];
  /*$cc = 'thales@multiin.com.br';*/
  $email_subject = 'Formulário de contato LabEmpreendedor';
  
  $email_message = 'Detalhes do Formulário:'."\n";
  $email_message .= 'Email: '.$email_from."\n";
  /*$email_message .= 'Telefone: '.$telefone."\n";*/

# Instantiate the client.
$mgClient = new Mailgun('key-ea0c09646862cada300c51d967f28d38');
$domain = "multiin.com.br";

# Make the call to the client.
$result = $mgClient->sendMessage($domain, array(
    'from'    => 'LabEmpreendedor <contato@labempreendedor.com>',
    /*'cc'      => $cc,*/
    'to'      => $email_to,
    'subject' => $email_subject,
    'text'    => $email_message
)/*, array(
    'attachment' => array($email_from . '.pdf')
)*/);

#Se o email for enviado com sucesso
if($result){
  // instantiate and use the dompdf class
  $data['success'] = true;
}else{
  $data['success'] = false;
} 

// return all our data to an AJAX call
echo json_encode($data);