<?php

require_once('class.phpmailer.php');

$mailer = new PHPMailer();
$mailer->IsSMTP();
$mailer->SMTPDebug = 1;
$mailer->Port = 587; //Indica a porta de conexão 
$mailer->Host = 'smtplw.com.br';//Endereço do Host do SMTP 
$mailer->SMTPAuth = true; //define se haverá ou não autenticação 
$mailer->Username = 'contato@abimael.com.br'; //Login de autenticação do SMTP
$mailer->Password = 'Boby@@0772019'; //Senha de autenticação do SMTP
$mailer->FromName = 'Bart S. Locaweb'; //Nome que será exibido
$mailer->From = 'remetente@email.com.br'; //Obrigatório ser a mesma caixa postal configurada no remetente do SMTP

$nome = $_POST['name'];
$email = $_POST['email'];
$mensagem = $_POST['message'];

$mailer->AddAddress('destinatario@email.com','Nome do 
destinatário');
//Destinatários
$mailer->Subject = 'Teste enviado através do PHP Mailer 
SMTPLW';
$mailer->Body = 'Este é um teste realizado com o PHP Mailer 
SMTPLW';
if(!$mailer->Send())
{
echo "Message was not sent";
echo "Mailer Error: " . $mailer->ErrorInfo; exit; }
print "E-mail enviado!"
?>