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

import com.rental.service.ProductService;
import com.rental.model.Complaint;
import com.rental.model.Product;


@RestController
@RequestMapping("/home")
public class HomeController {
	
	@Autowired
	private ProductService prodservice;
	
	
	@PostMapping("/product")
	public void addProduct(@RequestBody @Validated Product product) {
		prodservice.addProduct(product);
	}
	
	@GetMapping("/all")
	public List<Product> getProducts(){
		return prodservice.getProducts();
	}
	
	@GetMapping("/category/{id}")
	public List<Product> getByCategory(@PathVariable String id){
		return prodservice.getByCategory(id);
	}
	
	@GetMapping("/rating/{id}")
	public List<Product> getByRating(@PathVariable int id){
		return prodservice.getByRating(id);
	}
	
	
//	@GetMapping("/owner/{id}")
//	public List<Product> getByOwner(@PathVariable String id){
//		return prodservice.getByOwner(id);
//	}
	
	@GetMapping("/brand/{id}")
	public List<Product> getByBrand(@PathVariable String id){
		return prodservice.getByBrand(id);
	}
	
	@GetMapping("/comp")
	public List<Complaint> getComp(){
		return prodservice.getcomplaint();
	}

}
