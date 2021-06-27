package online.ordering.mailservice;

import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

@Service
public class mailsender {

	@Bean
	public JavaMailSender getJavaMailSender() {
	    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
	    mailSender.setHost("smtp.gmail.com");
	   // mailSender.setPort(587);
	    mailSender.setPort(587);
	    
	    mailSender.setUsername("ayaaadel950@gmail.com");
	    mailSender.setPassword("Aa123@987");
	    
	    Properties props = mailSender.getJavaMailProperties();
	    props.put("mail.transport.protocol", "smtp");
	    props.put("mail.smtp.auth", "true");
	    props.put("mail.smtp.starttls.enable", "true");
	    props.put("mail.debug", "true");
	    props.put("mail.ssl", "true");

	    return mailSender;
	}
	
	
	
  /*public void setMailSender(MailSender mailSender) {
        this.mail_Sender = mail_Sender;
    } */
    
    
	//private JavaMailSender mail_Sender  ;
    public void sendMail(SimpleMailMessage message,JavaMailSender mail_Sender) {
    	 //MailSender mail_Sender = null  ; 
        //creating mess`age  
      /*  SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(msg);*/
        //sending message  
        mail_Sender.send(message);
    }
}
