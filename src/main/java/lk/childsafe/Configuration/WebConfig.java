package lk.childsafe.Configuration;

import jakarta.servlet.DispatcherType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class WebConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() // Disables CSRF protection
                .formLogin()
                .loginPage("/login")
                .usernameParameter("username")
                .passwordParameter("password")
                .successHandler((request, response, authentication) -> {
                    // Custom success handler for role-based redirection
                    String redirectUrl = "/dashboard"; // Default for Admin
                    if (authentication.getAuthorities().stream()
                            .anyMatch(auth -> auth.getAuthority().equals("Teacher"))) {
                        redirectUrl = "/teacherview"; // Redirect for Teacher
                    }
                    else if (authentication.getAuthorities().stream()
                            .anyMatch(auth -> auth.getAuthority().equals("Student"))) {
                        redirectUrl = "/studentview"; // Redirect for Teacher
                    }
                    else if (authentication.getAuthorities().stream()
                            .anyMatch(auth -> auth.getAuthority().equals("Parent"))) {
                        redirectUrl = "/parentview"; // Redirect for Teacher
                    }
                    response.sendRedirect(redirectUrl);
                })
                .failureUrl("/login?error=usernamepassworderror").and().httpBasic().and()
                .authorizeHttpRequests((request) ->
                {
                    request.dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
                            .requestMatchers("/assets/**").permitAll().
                            requestMatchers("/login").permitAll().
                            requestMatchers("/studentmodel").permitAll().
                            requestMatchers("/studentstatus/**").permitAll().
                            requestMatchers("/teachermodel").permitAll().
                            requestMatchers("/teacherstatus/**").permitAll().
                            requestMatchers("/parentmodel").permitAll().
                            requestMatchers(HttpMethod.POST, "/parent").permitAll().
                            requestMatchers(HttpMethod.POST, "/student").permitAll().
                            requestMatchers(HttpMethod.POST, "/teacher").permitAll().
                            requestMatchers("/parentstatus/**").permitAll().
                            requestMatchers("/changeprofile").permitAll().
                            requestMatchers("/createaccount").permitAll().
                            requestMatchers("/accessdenied").permitAll().
                            requestMatchers("/createadmin").permitAll().
                            requestMatchers("/teacher").hasAnyAuthority("Admin").
                            requestMatchers("/student").hasAnyAuthority("Admin").
                            requestMatchers("/parent").hasAnyAuthority("Admin").
                            requestMatchers("/classImplementation").hasAnyAuthority("Admin").
                            requestMatchers("/stureg").hasAnyAuthority("Admin").
                            requestMatchers("/teacherregistration").hasAnyAuthority("Admin").
                            requestMatchers("/institute").hasAnyAuthority("Admin").
                            requestMatchers("/attendance").hasAnyAuthority("Admin","Teacher").
                            anyRequest().authenticated();


                }).//any request of above get authenticated
                logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/login")
                .and()
                .exceptionHandling()
                .accessDeniedPage("/error");
        return http.build();
    }


    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }


    @Bean
    public HttpFirewall httpFirewall(){
        return new DefaultHttpFirewall();
    }



}
