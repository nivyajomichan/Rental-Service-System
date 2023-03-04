package com.rental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rental.service.ProductService;

@RestController
@RequestMapping("/dash")
public class DashboardController {
	
	@Autowired
	private ProductService prodservice;
	
//	@GetMapping("/avl")
//	public List<Integer> getpie()
//	{
//		
//	}

}
