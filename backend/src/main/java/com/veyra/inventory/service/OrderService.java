package com.veyra.inventory.service;

import com.veyra.inventory.dto.OrderRequest;
import com.veyra.inventory.entity.Customer;
import com.veyra.inventory.entity.OrderItem;
import com.veyra.inventory.entity.PlywoodOrder;
import com.veyra.inventory.entity.PlywoodVariant;
import com.veyra.inventory.repository.CustomerRepository;
import com.veyra.inventory.repository.PlywoodOrderRepository;
import com.veyra.inventory.repository.PlywoodVariantRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final PlywoodOrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final PlywoodVariantRepository variantRepository;

    public List<PlywoodOrder> getAll() {
        return orderRepository.findAll();
    }

    @Transactional
    public PlywoodOrder create(OrderRequest request) {
        Customer customer = customerRepository.findById(request.customerId())
                .orElseThrow(() -> new EntityNotFoundException("Customer not found: " + request.customerId()));

        PlywoodOrder order = PlywoodOrder.builder()
                .customer(customer)
                .customerName(customer.getCompanyName())
                .status("Pending")
                .createdAt(LocalDateTime.now())
                .items(new ArrayList<>())
                .total(0.0)
                .build();

        double total = 0;
        for (OrderRequest.OrderItemRequest itemReq : request.items()) {
            PlywoodVariant variant = variantRepository.findById(itemReq.variantId())
                    .orElseThrow(() -> new EntityNotFoundException("Variant not found: " + itemReq.variantId()));

            OrderItem item = OrderItem.builder()
                    .order(order)
                    .variantId(variant.getId())
                    .variantName(variant.getName())
                    .quantity(itemReq.quantity())
                    .unitPrice(variant.getPricePerSheet())
                    .build();

            order.getItems().add(item);
            total += itemReq.quantity() * variant.getPricePerSheet();
        }

        order.setTotal(total);
        return orderRepository.save(order);
    }
}
