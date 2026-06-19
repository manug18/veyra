package com.veyra.inventory.dto;

public record DashboardStats(
        long totalVariants,
        long inWarehouse,
        long inTransit,
        long notDispatched,
        long totalCustomers,
        long totalOrders
) {}
