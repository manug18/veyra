package com.veyra.inventory.dto;

/** Full variant data — returned only to ADMIN role */
public record VariantAdminDto(
        Long id,
        String name,
        String thickness,
        String grade,
        String finishColor,
        String description,
        Integer stock,
        Double pricePerSheet,
        String status
) {}
