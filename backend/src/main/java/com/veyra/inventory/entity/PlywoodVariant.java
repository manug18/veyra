package com.veyra.inventory.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "plywood_variants", uniqueConstraints = @UniqueConstraint(columnNames = "name"))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlywoodVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    private String thickness;
    private String grade;

    /** Visual finish / colour of the wood — the only field shown to VIEWER role */
    private String finishColor;

    @Column(length = 500)
    private String description;

    private Integer stock;
    private Double pricePerSheet;

    /** IN_WAREHOUSE | IN_TRANSIT | NOT_DISPATCHED */
    private String status;
}
