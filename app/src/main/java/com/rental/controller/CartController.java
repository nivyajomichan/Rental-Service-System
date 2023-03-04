package com.rental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rental.model.Complaint;
import com.rental.model.Product;
import com.rental.service.ProductService;

@RestController
@RequestMapping("/cart")
public class CartController {
	
	@Autowired
	private ProductService prodservice;
	
	@GetMapping("/book/{uname}/{prodid}")
	public boolean book(@PathVariable String uname,@PathVariable int prodid){
		return prodservice.book(uname,prodid);
	}
	
	@GetMapping("/return/{uname}/{prodid}")
	public boolean returnitem(@PathVariable String uname,@PathVariable int prodid){
		return prodservice.returnitem(uname,prodid);
	}
	
	@GetMapping("/{uname}")
	public List<Product> getActiveItems(@PathVariable String uname){
		return prodservice.getActiveItems(uname);
	}
	
	@GetMapping("/own/{uname}")
	public List<Product> getownitems(@PathVariable String uname){
		return prodservice.getownitems(uname);
	}
	
	@GetMapping("/rec/{uname}")
	public List<Product> getrecommendations(@PathVariable String uname){
		return prodservice.getrecommendations(uname);
	}
	
	@GetMapping("/prev/{uname}")
	public List<Product> getprev(@PathVariable String uname){
		return prodservice.getprev_rent(uname);
	}
	
	@GetMapping("/rate/{pid}/{num}")
	public boolean rateitem(@PathVariable int pid,@PathVariable int num){
		return prodservice.rateitem(pid,num);
	}
	
	@PostMapping("/complaint")
	public boolean comp(@RequestBody @Validated Complaint complaint)
	{
		return prodservice.addcomplaint(complaint);
	}

}
