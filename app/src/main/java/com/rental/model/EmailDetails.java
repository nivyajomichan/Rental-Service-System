package com.rental.model;

//import jakarta.persistence.*;



public class EmailDetails {
	
	private String recipient;
    private String msgBody;
    private String subject;
    
    public String getRecipient() {
		return recipient;
	}
	@Override
	public String toString() {
		return "EmailDetails [recipient=" + recipient + ", msgBody=" + msgBody + ", subject=" + subject + "]";
	}
	public void getRecipient(String recipient) {
		this.recipient = recipient;
	}
	
	public String getMsgBody() {
		return msgBody;
	}
	public void getMsgBody(String msgBody) {
		this.msgBody = msgBody;
	}
	
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}

}
