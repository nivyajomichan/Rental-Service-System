package com.rental.service;

import com.rental.model.EmailDetails;

public interface EmailService {
	String sendSimpleMail(EmailDetails details);
}
