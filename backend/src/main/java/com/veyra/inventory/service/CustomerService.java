package com.veyra.inventory.service;

import com.veyra.inventory.entity.Customer;
import com.veyra.inventory.repository.CustomerRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository repository;

    public List<Customer> getAll() {
        return repository.findAll();
    }

    public Customer create(Customer customer) {
        return repository.save(customer);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Customer not found: " + id);
        }
        repository.deleteById(id);
    }
}
