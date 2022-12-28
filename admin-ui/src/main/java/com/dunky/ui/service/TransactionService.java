package com.dunky.ui.service;

import com.dunky.ui.model.Transaction;

import java.util.List;

public interface TransactionService {

    Transaction saveTransaction(Transaction transaction);

    Long numberOfTransactions();

    List<Transaction> findAllTransactions();
}
