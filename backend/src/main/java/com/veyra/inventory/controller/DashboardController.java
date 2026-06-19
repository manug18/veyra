package com.veyra.inventory.controller;

import com.veyra.inventory.dto.DashboardStats;
import com.veyra.inventory.repository.CustomerRepository;
import com.veyra.inventory.repository.PlywoodOrderRepository;
import com.veyra.inventory.repository.PlywoodVariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final PlywoodVariantRepository variantRepository;
    private final CustomerRepository customerRepository;
    private final PlywoodOrderRepository orderRepository;

    @GetMapping
    public ResponseEntity<DashboardStats> getStats() {
        DashboardStats stats = new DashboardStats(
                variantRepository.count(),
                variantRepository.countByStatus("IN_WAREHOUSE"),
                variantRepository.countByStatus("IN_TRANSIT"),
                variantRepository.countByStatus("NOT_DISPATCHED"),
                customerRepository.count(),
                orderRepository.count()
        );
        return ResponseEntity.ok(stats);
    }
}
