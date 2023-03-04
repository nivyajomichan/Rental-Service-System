package com.rental.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name ="complaint")
public class Complaint {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="co_id")
	private int id;
	
	@Column(name = "co_text")
	private String comptext;
	
	@Column(name = "co_owname")
	private String owname;
	
	@Column(name = "co_pr_id")
	private int prodid;

	public int getProdid() {
		return prodid;
	}

	public void setProdid(int prodid) {
		this.prodid = prodid;
	}

	public String getOwname() {
		return owname;
	}

	public void setOwname(String owname) {
		this.owname = owname;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getComptext() {
		return comptext;
	}

	public void setComptext(String comptext) {
		this.comptext = comptext;
	}

}
