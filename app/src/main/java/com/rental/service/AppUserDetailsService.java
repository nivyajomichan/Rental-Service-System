package com.rental.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.rental.model.User;
import com.rental.repository.UserRepository;
import com.rental.security.AppUser;


@Service
public class AppUserDetailsService implements UserDetailsService {
	
	
	@Autowired
	UserRepository userrepository;
		
	
	public AppUserDetailsService(UserRepository userrepository) {
		super();
		this.userrepository = userrepository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
		User u=userrepository.findByUsername(name);
		System.out.println("in");
		if(u== null){
			throw new UsernameNotFoundException("no user");
		}
		else
		{
			System.out.println("user is "+u.getUsername());
		}
		AppUser au= new AppUser(u);
		return au;
	}
	
	
	public boolean signup(User newuser){
		User u=userrepository.findByUsername(newuser.getUsername());
		if(u==null && newuser.getPassword() != null)
		{
			String password=newuser.getPassword();
			BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();
			String newpassword=encoder.encode(password);
			newuser.setRole("USER");
			newuser.setPassword(newpassword);
			userrepository.save(newuser);
			System.out.println("user is "+newuser);
			return true;
		}
		if( u==null && newuser.getPassword() == null)
		{

			newuser.setRole("GOOGLE_USER");
			userrepository.save(newuser);
			System.out.println("user is "+newuser);
			return true;
		}
		if (newuser.getPassword() == null)
		{
			return true; //google sign in
		}
		return false;
	}



}
