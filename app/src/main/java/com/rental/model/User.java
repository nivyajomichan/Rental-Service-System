package com.rental.model;



import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name="user")
public class User {
	

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", password=" + password + ", email=" + email + ", age=" + age + ", contact=" + contact + ", pincode="
				+ pincode + ", role=" + role + "]";
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="us_id")
	private int id;
	
	@Column(name="us_user_name")
	private String username;
	
	@Column(name="us_first_name")
	private String firstName;
	
	@Column(name="us_last_name")
	private String lastName;
	
	@Column(name="us_password")
	private String password;
	
	@Column(name="us_email")
	private String email;
	
	@Column(name="us_age")
	private int age;
	
	@Column(name="us_contact_no")
	private String contact;
	
	@Column(name="us_pincode")
	private int pincode;
	
	@OneToMany(mappedBy = "renterId",cascade=CascadeType.ALL)
    private List<Product> bookings;
	
	@OneToMany(mappedBy = "ownerId",cascade=CascadeType.ALL)
    private List<Product> products;
	
	@ManyToMany
    @JoinTable(name = "order_us_pr",
        joinColumns = @JoinColumn(name = "or_us_id"), 
        inverseJoinColumns = @JoinColumn(name = "or_pr_id"))
	private List<Product> prev_products;
	
	public String getContact() {
		return contact;
	}

	public List<Product> getPrev_products() {
		return prev_products;
	}

	public void setPrev_products(List<Product> prev_products) {
		this.prev_products = prev_products;
	}

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public List<Product> getBookings() {
		return bookings;
	}

	public void setBookings(List<Product> bookings) {
		this.bookings = bookings;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	@Column(name="us_role")
	private String role;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public int getPincode() {
		return pincode;
	}

	public void setPincode(int pincode) {
		this.pincode = pincode;
	}
	
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	
}
	
	
	