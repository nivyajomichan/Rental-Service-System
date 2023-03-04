package com.rental.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.rental.model.User;

public class AppUser implements UserDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private User user;
	private Collection<? extends GrantedAuthority> authorities;
	
	public AppUser(User user) {
		super();
//		System.out.println("app role"+user.getRoles().get(0).getName());
		List<String> roleset = new ArrayList<String>();
		roleset.add(user.getRole());
		this.user = user;
		this.authorities = roleset.stream().map(role -> new SimpleGrantedAuthority(role)).collect(Collectors.toList());
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return this.authorities;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return user.getUsername();
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	

	
}
