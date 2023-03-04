package com.rental;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import com.rental.security.JwtAuthorizationFilter;
import com.rental.service.AppUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	
	private static final Logger LOGGER = LoggerFactory.getLogger(RentalApplication.class);
	
	
	@Autowired
	public AppUserDetailsService appUserDetailsService;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		LOGGER.info("passwordEncoder");
		return new BCryptPasswordEncoder();
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		auth.inMemoryAuthentication().withUser("admin").password(passwordEncoder().encode("pwd")).roles("ADMIN").and()
//				.withUser("user").password(passwordEncoder().encode("pwd")).roles("USER");
//		auth.userDetailsService(inMemoryUserDetailsManager());
		auth.userDetailsService(appUserDetailsService).passwordEncoder(passwordEncoder());
	}
	
	
	@SuppressWarnings("rawtypes")
	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {

		httpSecurity.cors();
		httpSecurity.csrf().disable().httpBasic().and().authorizeRequests().antMatchers("/users").permitAll();
		httpSecurity.csrf().disable().httpBasic().and().authorizeRequests().antMatchers("/book").permitAll();
		httpSecurity.csrf().disable().anonymous().and().httpBasic().and().authorizeRequests().antMatchers("/home").permitAll();
		httpSecurity.csrf().disable().httpBasic().and().authorizeRequests().antMatchers("/authenticate").permitAll();
	}
	
	@Bean
	public InMemoryUserDetailsManager inMemoryUserDetailsManager() {
	    LOGGER.info("inMemoryUserDetailsManager");
	    List<UserDetails> userDetailsList = new ArrayList<>();

	    userDetailsList.add(
	        User.withUsername("user")
	            .password(passwordEncoder()
	            .encode("pwd"))
	            .roles("USER").build());
		
	    userDetailsList.add(
	        User.withUsername("admin")
	            .password(passwordEncoder()
	            .encode("pwd"))
	            .roles("ADMIN").build());


	    return new InMemoryUserDetailsManager(userDetailsList);
	}

}
