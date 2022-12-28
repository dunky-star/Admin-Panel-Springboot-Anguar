package com.dunky.ui.config;

import com.dunky.ui.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig  {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(BCryptPasswordEncoder bCryptPasswordEncoder) {
        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
        manager.createUser(User.withUsername("kaligs")
                .password(bCryptPasswordEncoder.encode("secret123"))
                .roles("USER")
                .build());
        manager.createUser(User.withUsername("admin")
                .password(bCryptPasswordEncoder.encode("secret123"))
                .roles("USER", "ADMIN")
                .build());
        return manager;
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.cors().and()
                .authorizeHttpRequests((requests) -> {
                    try {
                        requests
                            //These are public paths
                            .requestMatchers("/resources/**", "/error", "/api/user/**").permitAll()
                            //These can be reachable for just have admin role.
                            .requestMatchers("/api/admin/**").hasRole("ADMIN")
                            //All remaining paths should need authentication.
                            .anyRequest().fullyAuthenticated()
                            .and()
                            //logout will log the user out by invalidated session.
                            .logout().permitAll()
                            .logoutRequestMatcher(new AntPathRequestMatcher("/api/user/logout", "POST"))
                            .and()
                            //login form and path
                            .formLogin().loginPage("/api/user/login").and()
                            //enable basic authentication
                            .httpBasic().and()
                            //We will handle it later.
                            //Cross side request forgery
                            .csrf().disable();
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                })
                .httpBasic();

        return http.build();
    }


}
