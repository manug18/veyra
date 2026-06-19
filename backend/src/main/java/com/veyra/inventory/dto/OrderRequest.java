package com.veyra.inventory.dto;

import java.util.List;

public record OrderRequest(
        Long customerId,
        List<OrderItemRequest> items
) {
    public record OrderItemRequest(Long variantId, Integer quantity) {}
}
