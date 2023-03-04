package com.rental.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rental.model.Complaint;
import com.rental.model.Product;
import com.rental.model.User;
import com.rental.repository.ComplaintRepository;
import com.rental.repository.ProductRepository;
import com.rental.repository.UserRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository prodrepo;
	
	@Autowired
	private UserRepository userrepository;
	
	@Autowired
	private ComplaintRepository comprepo;
	

	
	public List<Product> getProducts(){
		
		return prodrepo.findByAvailableTrue();
	}
	
	public List<Product> getByCategory(String category){
			
			return prodrepo.findByCategory(category);
		}

	public List<Product> getByRating(int rating){
		
		return prodrepo.findByRatingGreaterThanEqual(rating);
	}

	public List<Product> getByBrand(String brand){
		
		return prodrepo.findByBrand(brand);
	}

	public void addProduct(Product product) {
		// make it false after admin dashboard
		product.setAvailable(true);
		product.setNoofreview(1);
		prodrepo.save(product);
	}

	public boolean book(String uname, int prodid) {
		Product product = prodrepo.findById(prodid);
		User u = userrepository.findByUsername(uname);
		product.setAvailable(false);
		product.setRenterId(u);
//		prodrepo.save(product);
		u.getBookings().add(product);
		userrepository.save(u);
		return false;
	}
	
	public boolean returnitem(String uname, int prodid) {
		Product product = prodrepo.findById(prodid);
		User u = userrepository.findByUsername(uname);
		product.setAvailable(true);
		product.setRenterId(null);
//		product.getPrev_renters().add(u);
//		prodrepo.save(product);
		u.getBookings().remove(product);
		u.getPrev_products().add(product);
		userrepository.save(u);
		
		return false;
	}

	public List<Product> getActiveItems(String uname) {
		User u = userrepository.findByUsername(uname);
		return prodrepo.findByRenterId(u);
	}

	public List<Product> getownitems(String uname) {
		User u = userrepository.findByUsername(uname);
		return prodrepo.findByOwnerId(u);
	}
	
	public List<Product> getrecommendations(String uname) {
		User u = userrepository.findByUsername(uname);
		List<String> cat = new ArrayList<String>();
		List<String>brand = new ArrayList<String>();
		Set<Product> recommendation = new HashSet<Product>();
		for (Product p:u.getPrev_products())
		{
			if (!cat.contains(p.getCategory()))
			{
				recommendation.addAll(prodrepo.findByCategory(p.getCategory()));
			}
			else
			{
				cat.add(p.getCategory());
			}
			if (!brand.contains(p.getBrand()))
			{
				recommendation.addAll(prodrepo.findByBrand(p.getBrand()));
			}
			else
			{
				brand.add(p.getBrand());
			}
		}
		List<Product> rec = new ArrayList<Product>(recommendation);
		return rec;
		
	}
	
	public List<Product> getprev_rent(String uname){
		
		User u = userrepository.findByUsername(uname);
		return u.getPrev_products();
	}
	
	public boolean rateitem(int prodid,int rating) {
		Product product = prodrepo.findById(prodid);
		int rt = (int)((product.getRating() + rating)/(product.getNoofreview()+1));
		product.setRating(rt);
		product.setNoofreview(product.getNoofreview()+1);
		prodrepo.save(product);
		return true;
	}
	
	public boolean addcomplaint(Complaint complaint)
	{
		comprepo.save(complaint);
		return true;
	}
	
	public List<Complaint> getcomplaint()
	{
		return comprepo.findAll();
	}
		
	

}
