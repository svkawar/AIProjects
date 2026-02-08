package com.inventory.constroller;

import com.inventory.entity.Inventory;
import com.inventory.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "http://localhost:3000")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    /**
     * View all inventory
     * GET /api/inventory
     */
    @GetMapping
    public ResponseEntity<List<Inventory>> getAllInventory() {
        List<Inventory> inventoryList = inventoryService.getAllInventory();
        return ResponseEntity.ok(inventoryList);
    }

    /**
     * Get inventory by ID
     * GET /api/inventory/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Inventory> getInventoryById(@PathVariable Long id) {
        Optional<Inventory> inventory = inventoryService.getInventoryById(id);
        return inventory.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Buy - Add new inventory
     * POST /api/inventory/buy
     */
    @PostMapping("/buy")
    public ResponseEntity<Inventory> buyInventory(@RequestBody Inventory inventory) {
        try {
            Inventory savedInventory = inventoryService.buyInventory(inventory);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedInventory);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Sell - Update inventory with release details
     * POST /api/inventory/sell/{id}
     */
    @PostMapping("/sell/{id}")
    public ResponseEntity<Inventory> sellInventory(
            @PathVariable Long id,
            @RequestParam Integer releaseBags,
            @RequestParam Double releaseWeight) {
        try {
            Inventory updatedInventory = inventoryService.sellInventory(id, releaseBags, releaseWeight);
            return ResponseEntity.ok(updatedInventory);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Update inventory
     * PUT /api/inventory/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Inventory> updateInventory(
            @PathVariable Long id,
            @RequestBody Inventory inventoryDetails) {
        try {
            Inventory updatedInventory = inventoryService.updateInventory(id, inventoryDetails);
            return ResponseEntity.ok(updatedInventory);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Delete inventory
     * DELETE /api/inventory/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventory(@PathVariable Long id) {
        inventoryService.deleteInventory(id);
        return ResponseEntity.noContent().build();
    }
}