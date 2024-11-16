// src/fixtures/data.ts

export const fixtures = {
  dataFrames: [
    {
      df_name: "Orders",
      total_rows: 2500,
      created_at: "2024-03-15T00:00:00Z",
      metadata: {
        chunks: [
          {
            name: "Month to date orders",
            size: "2.3MB",
            lastModified: "2024-03-15",
            rows: 1000
          },
          {
            name: "Daily orders",
            size: "1.1MB",
            lastModified: "2024-03-15",
            rows: 800
          },
          {
            name: "Customer 123 Orders",
            size: "856KB",
            lastModified: "2024-03-15",
            rows: 700
          }
        ]
      }
    },
    {
      df_name: "Products",
      total_rows: 1500,
      created_at: "2024-03-15T00:00:00Z",
      metadata: {
        chunks: [
          {
            name: "Active products",
            size: "1.5MB",
            lastModified: "2024-03-15",
            rows: 800
          },
          {
            name: "Discontinued products",
            size: "980KB",
            lastModified: "2024-03-15",
            rows: 700
          }
        ]
      }
    }
  ],
  
  sampleData: {
    Orders: {
      data: [
        { order_id: "ORD-001", customer: "John Doe", amount: 150.00, date: "2024-03-15" },
        { order_id: "ORD-002", customer: "Jane Smith", amount: 275.50, date: "2024-03-15" },
        { order_id: "ORD-003", customer: "Bob Johnson", amount: 89.99, date: "2024-03-15" },
        { order_id: "ORD-004", customer: "Alice Brown", amount: 199.99, date: "2024-03-15" },
        { order_id: "ORD-005", customer: "Charlie Wilson", amount: 349.99, date: "2024-03-15" }
      ],
      metadata: {
        total_rows: 2500,
        chunks: [
          { path: "chunk1", rows: 1000, number: 1 },
          { path: "chunk2", rows: 800, number: 2 },
          { path: "chunk3", rows: 700, number: 3 }
        ]
      }
    },
    Products: {
      data: [
        { product_id: "PRD-001", name: "Laptop", price: 999.99, stock: 50 },
        { product_id: "PRD-002", name: "Mouse", price: 29.99, stock: 100 },
        { product_id: "PRD-003", name: "Keyboard", price: 59.99, stock: 75 },
        { product_id: "PRD-004", name: "Monitor", price: 299.99, stock: 30 },
        { product_id: "PRD-005", name: "Headphones", price: 89.99, stock: 60 }
      ],
      metadata: {
        total_rows: 1500,
        chunks: [
          { path: "chunk1", rows: 800, number: 1 },
          { path: "chunk2", rows: 700, number: 2 }
        ]
      }
    }
  }
};
