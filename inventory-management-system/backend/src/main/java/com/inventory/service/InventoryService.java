package com.inventory.service;

import com.inventory.entity.Inventory;
import com.inventory.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    /**
     * Get all inventory items
     */
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    /**
     * Get inventory by ID
     */
    public Optional<Inventory> getInventoryById(Long id) {
        return inventoryRepository.findById(id);
    }

    /**
     * Buy - Add new inventory item
     */
    public Inventory buyInventory(Inventory inventory) {
        // Initialize balance fields with initial values
        if (inventory.getBalanceBags() == null) {
            inventory.setBalanceBags(inventory.getNoOfBags());
        }
        if (inventory.getBalanceWeight() == null) {
            inventory.setBalanceWeight(inventory.getWtInMt());
        }
        if (inventory.getReleaseBags() == null) {
            inventory.setReleaseBags(0);
        }
        if (inventory.getReleaseWeight() == null) {
            inventory.setReleaseWeight(0.0);
        }
        return inventoryRepository.save(inventory);
    }

    /**
     * Sell - Update inventory with release details
     */
    public Inventory sellInventory(Long id, Integer releaseBags, Double releaseWeight) {
        Optional<Inventory> inventoryOptional = inventoryRepository.findById(id);

        if (inventoryOptional.isPresent()) {
            Inventory inventory = inventoryOptional.get();

            // Update release details
            inventory.setReleaseBags(releaseBags);
            inventory.setReleaseWeight(releaseWeight);

            // Calculate balance
            if (inventory.getNoOfBags() != null && inventory.getWtInMt() != null) {
                inventory.setBalanceBags(inventory.getNoOfBags() - releaseBags);
                inventory.setBalanceWeight(inventory.getWtInMt() - releaseWeight);
            }

            return inventoryRepository.save(inventory);
        }

        throw new RuntimeException("Inventory not found with ID: " + id);
    }

    /**
     * Update inventory
     */
    public Inventory updateInventory(Long id, Inventory inventoryDetails) {
        Optional<Inventory> inventoryOptional = inventoryRepository.findById(id);

        if (inventoryOptional.isPresent()) {
            Inventory inventory = inventoryOptional.get();

            if (inventoryDetails.getWarehouseName() != null) {
                inventory.setWarehouseName(inventoryDetails.getWarehouseName());
            }
            if (inventoryDetails.getClientName() != null) {
                inventory.setClientName(inventoryDetails.getClientName());
            }
            if (inventoryDetails.getDepositionDate() != null) {
                inventory.setDepositionDate(inventoryDetails.getDepositionDate());
            }
            // Add more fields as needed...

            return inventoryRepository.save(inventory);
        }

        throw new RuntimeException("Inventory not found with ID: " + id);
    }

    /**
     * Delete inventory
     */
    public void deleteInventory(Long id) {
        inventoryRepository.deleteById(id);
    }
}