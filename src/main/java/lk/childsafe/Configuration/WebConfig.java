package lk.childsafe.Configuration;

import jakarta.servlet.DispatcherType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
                .defaultSuccessUrl("/dashboard", true)
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
                            requestMatchers("/parentstatus/**").permitAll().
                            requestMatchers("/student/**").permitAll().
                            requestMatchers("/createaccount").permitAll().
                            requestMatchers("/accessdenied").permitAll().
                            requestMatchers("/createadmin").permitAll().
                            requestMatchers("/teacher/**").hasAnyAuthority("Admin").
                            requestMatchers("/student").hasAnyAuthority("Admin").
                            requestMatchers("/parent").hasAnyAuthority("Admin").
                            requestMatchers("/classImplementation").hasAnyAuthority("Admin").
                            requestMatchers("/stureg").hasAnyAuthority("Admin","Student").
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
