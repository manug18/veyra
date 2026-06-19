package com.veyra.inventory.dto;

/** Limited variant data — returned to VIEWER role (no price, no stock count) */
public record VariantViewerDto(
        Long id,
        String name,
        String thickness,
        String grade,
        String finishColor,
        String description,
        String status
) {}
