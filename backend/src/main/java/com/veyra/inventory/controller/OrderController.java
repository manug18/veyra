package com.veyra.inventory.controller;

import com.veyra.inventory.dto.OrderRequest;
import com.veyra.inventory.entity.PlywoodOrder;
import com.veyra.inventory.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<List<PlywoodOrder>> getAll() {
        return ResponseEntity.ok(orderService.getAll());
    }

    @PostMapping
    public ResponseEntity<PlywoodOrder> create(@RequestBody OrderRequest request) {
        return ResponseEntity.ok(orderService.create(request));
    }
}
