package com.veyra.inventory.controller;

import com.veyra.inventory.dto.VariantAdminDto;
import com.veyra.inventory.service.VariantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/variants")
@RequiredArgsConstructor
public class VariantController {

    private final VariantService variantService;

    @GetMapping
    public ResponseEntity<?> getAll(Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (isAdmin) {
            return ResponseEntity.ok(variantService.getAllAdmin());
        }
        return ResponseEntity.ok(variantService.getAllViewer());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<VariantAdminDto> create(@RequestBody @Valid VariantAdminDto dto) {
        return ResponseEntity.ok(variantService.create(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<VariantAdminDto> update(@PathVariable Long id,
                                                   @RequestBody @Valid VariantAdminDto dto) {
        return ResponseEntity.ok(variantService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        variantService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
