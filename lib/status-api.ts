import type { StatusData } from "@/types/status"

// This is a mock API function that would normally fetch data from a backend
export async function fetchServiceStatus(): Promise<StatusData> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Return mock data
  return {
    services: [
      {
        id: "api-gateway",
        name: "API Gateway",
        description: "Main API entry point for all services",
        category: "api",
        status: "operational",
        uptime: 99.98,
        metrics: {
          responseTime: 87,
          responseTimeChange: -2.3,
          errorRate: 0.02,
          errorRateChange: -0.01,
          requestsPerMinute: 1240,
          requestsChange: 5.7,
        },
      },
      {
        id: "auth-service",
        name: "Authentication Service",
        description: "User authentication and authorization",
        category: "core",
        status: "operational",
        uptime: 99.99,
        metrics: {
          responseTime: 112,
          responseTimeChange: 1.5,
          errorRate: 0.01,
          errorRateChange: 0,
          requestsPerMinute: 850,
          requestsChange: 3.2,
        },
      },
      {
        id: "payment-processor",
        name: "Payment Processor",
        description: "Payment processing and billing",
        category: "core",
        status: "degraded",
        statusMessage: "We're experiencing higher than normal response times. Our team is investigating the issue.",
        uptime: 99.82,
        metrics: {
          responseTime: 320,
          responseTimeChange: 45.2,
          errorRate: 0.5,
          errorRateChange: 0.3,
          requestsPerMinute: 320,
          requestsChange: -2.1,
        },
      },
      {
        id: "database-cluster",
        name: "Database Cluster",
        description: "Primary database infrastructure",
        category: "infrastructure",
        status: "operational",
        uptime: 99.95,
        metrics: {
          responseTime: 15,
          responseTimeChange: -1.1,
          errorRate: 0.01,
          errorRateChange: 0,
          requestsPerMinute: 5600,
          requestsChange: 2.3,
        },
      },
      {
        id: "storage-service",
        name: "Storage Service",
        description: "Object storage and file management",
        category: "infrastructure",
        status: "maintenance",
        statusMessage: "Scheduled maintenance in progress. Expected completion at 3:00 PM UTC.",
        uptime: 99.9,
        metrics: {
          responseTime: 145,
          responseTimeChange: 12.5,
          errorRate: 0.05,
          errorRateChange: 0.03,
          requestsPerMinute: 780,
          requestsChange: -15.3,
        },
      },
      {
        id: "search-service",
        name: "Search Service",
        description: "Full-text search and indexing",
        category: "api",
        status: "operational",
        uptime: 99.93,
        metrics: {
          responseTime: 210,
          responseTimeChange: -5.2,
          errorRate: 0.03,
          errorRateChange: -0.01,
          requestsPerMinute: 430,
          requestsChange: 1.8,
        },
      },
      {
        id: "notification-service",
        name: "Notification Service",
        description: "Email, SMS, and push notifications",
        category: "api",
        status: "outage",
        statusMessage:
          "We're currently experiencing a complete outage of our notification service. Our engineers are working to restore service as quickly as possible.",
        uptime: 98.75,
        metrics: {
          responseTime: 450,
          responseTimeChange: 120.5,
          errorRate: 35.2,
          errorRateChange: 35.0,
          requestsPerMinute: 150,
          requestsChange: -65.3,
        },
      },
      {
        id: "cdn",
        name: "Content Delivery Network",
        description: "Global content distribution",
        category: "infrastructure",
        status: "operational",
        uptime: 99.99,
        metrics: {
          responseTime: 35,
          responseTimeChange: -1.5,
          errorRate: 0.01,
          errorRateChange: 0,
          requestsPerMinute: 8500,
          requestsChange: 4.2,
        },
      },
    ],
    incidents: [
      {
        id: "inc-001",
        title: "Notification Service Outage",
        date: "2025-03-13T14:30:00Z",
        status: "investigating",
        message:
          "We're investigating issues with our notification delivery system. Some users may not receive email or push notifications.",
        affectedServices: ["Notification Service"],
      },
      {
        id: "inc-002",
        title: "Payment Processor Degraded Performance",
        date: "2025-03-13T10:15:00Z",
        status: "identified",
        message:
          "We've identified the cause of increased latency in our payment processing system and are working on a fix.",
        affectedServices: ["Payment Processor"],
      },
      {
        id: "inc-003",
        title: "Storage Service Maintenance",
        date: "2025-03-12T22:00:00Z",
        status: "monitoring",
        message: "Scheduled maintenance has been completed. We're monitoring the system for any issues.",
        affectedServices: ["Storage Service"],
      },
      {
        id: "inc-004",
        title: "API Gateway Latency",
        date: "2025-03-10T08:45:00Z",
        status: "resolved",
        message:
          "The increased latency issues with our API Gateway have been resolved. All systems are operating normally.",
        affectedServices: ["API Gateway"],
      },
    ],
  }
}

