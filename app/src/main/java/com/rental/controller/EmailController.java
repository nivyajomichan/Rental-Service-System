package com.rental.controller;


//Importing required classes
import com.rental.model.EmailDetails;
import com.rental.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//Annotation
@RestController
@RequestMapping("/send")
//Class
public class EmailController {

 @Autowired private EmailService emailService;

 // Sending a simple Email
 @PostMapping("/Mail")
 public boolean
 sendMail(@Validated @RequestBody EmailDetails details)
 {
	 System.out.printf("in");
	 System.out.print(details);
	 String status
         = emailService.sendSimpleMail(details);
	 System.out.println(status);
     return true;
 }

}