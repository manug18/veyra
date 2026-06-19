package com.veyra.inventory.service;

import com.veyra.inventory.dto.VariantAdminDto;
import com.veyra.inventory.dto.VariantViewerDto;
import com.veyra.inventory.entity.PlywoodVariant;
import com.veyra.inventory.repository.PlywoodVariantRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VariantService {

    private final PlywoodVariantRepository repository;

    public List<VariantAdminDto> getAllAdmin() {
        return repository.findAll().stream().map(this::toAdminDto).toList();
    }

    public List<VariantViewerDto> getAllViewer() {
        return repository.findAll().stream().map(this::toViewerDto).toList();
    }

    public VariantAdminDto create(VariantAdminDto dto) {
        PlywoodVariant variant = PlywoodVariant.builder()
                .name(dto.name())
                .thickness(dto.thickness())
                .grade(dto.grade())
                .finishColor(dto.finishColor())
                .description(dto.description())
                .stock(dto.stock())
                .pricePerSheet(dto.pricePerSheet())
                .status(dto.status())
                .build();
        return toAdminDto(repository.save(variant));
    }

    public VariantAdminDto update(Long id, VariantAdminDto dto) {
        PlywoodVariant v = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Variant not found: " + id));
        v.setName(dto.name());
        v.setThickness(dto.thickness());
        v.setGrade(dto.grade());
        v.setFinishColor(dto.finishColor());
        v.setDescription(dto.description());
        v.setStock(dto.stock());
        v.setPricePerSheet(dto.pricePerSheet());
        v.setStatus(dto.status());
        return toAdminDto(repository.save(v));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private VariantAdminDto toAdminDto(PlywoodVariant v) {
        return new VariantAdminDto(v.getId(), v.getName(), v.getThickness(), v.getGrade(),
                v.getFinishColor(), v.getDescription(), v.getStock(), v.getPricePerSheet(), v.getStatus());
    }

    private VariantViewerDto toViewerDto(PlywoodVariant v) {
        return new VariantViewerDto(v.getId(), v.getName(), v.getThickness(), v.getGrade(),
                v.getFinishColor(), v.getDescription(), v.getStatus());
    }
}
