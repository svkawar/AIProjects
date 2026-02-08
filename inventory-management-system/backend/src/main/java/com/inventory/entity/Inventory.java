package com.inventory.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "warehouse_name")
    private String warehouseName;

    @Column(name = "client_name")
    private String clientName;

    @Column(name = "deposition_date")
    private LocalDate depositionDate;

    @Column(name = "cir_no")
    private String cirNo;

    @Column(name = "storage_receipt_no")
    private String storageReceiptNo;

    @Column(name = "truck_no_in")
    private String truckNoIn;

    @Column(name = "commodity")
    private String commodity;

    @Column(name = "moisture")
    private Double moisture;

    @Column(name = "no_of_bags")
    private Integer noOfBags;

    @Column(name = "wt_in_mt")
    private Double wtInMt;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "truck_no_out")
    private String truckNoOut;

    @Column(name = "cdd_no")
    private String cddNo;

    @Column(name = "release_bags")
    private Integer releaseBags;

    @Column(name = "release_weight")
    private Double releaseWeight;

    @Column(name = "balance_bags")
    private Integer balanceBags;

    @Column(name = "balance_weight")
    private Double balanceWeight;

    @Column(name = "market_rate")
    private Double marketRate;

    @Column(name = "aum")
    private String aum;

    @Column(name = "funding_bank")
    private String fundingBank;

    @Column(name = "loan_date")
    private LocalDate loanDate;

    @Column(name = "laplg")
    private String laplg;

    @Column(name = "loan_amount")
    private Double loanAmount;

    @Column(name = "repayment_date")
    private LocalDate repaymentDate;

    @Column(name = "repayment_amount")
    private Double repaymentAmount;

    @Column(name = "balance_loan_amount")
    private Double balanceLoanAmount;

    @Column(name = "fumigation_date")
    private LocalDate fumigationDate;
}