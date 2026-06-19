package com.veyra.inventory.repository;

import com.veyra.inventory.entity.PlywoodVariant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlywoodVariantRepository extends JpaRepository<PlywoodVariant, Long> {
    List<PlywoodVariant> findByStatus(String status);
    long countByStatus(String status);
}
