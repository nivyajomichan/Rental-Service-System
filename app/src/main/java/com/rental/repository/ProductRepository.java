package com.rental.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.rental.model.Product;
import com.rental.model.User;

public interface ProductRepository extends CrudRepository<Product,Integer> {
	
	
	List<Product>findAll();
	
	List<Product>findByAvailableTrue();
	
	List<Product>findByRenterId(User u);
	
	List<Product>findByOwnerId(User u);
	
	Product findById(int id);
	
	List<Product>findByCategory(String category);
	
	List<Product>findByRatingGreaterThanEqual(int rating);
	
//	List<Product>findByOwner(String owner);
	
	List<Product>findByBrand(String brand);

}
