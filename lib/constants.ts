export const constants = {
  navigation: [
    { name: "Home", href: "/" },
    { name: "Buy", href: "/buy" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Discussions", href: "/discussions" },
    { name: "Community", href: "/community" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
  ],
  features: [
    {
      title: "High Performance",
      description: "Our servers are optimized for speed and reliability, ensuring your applications run smoothly.",
      icon: "zap",
    },
    {
      title: "Scalable Infrastructure",
      description: "Scale your resources up or down based on your needs, without any downtime.",
      icon: "server",
    },
    {
      title: "Advanced Security",
      description: "Enterprise-grade security features to keep your data and applications safe.",
      icon: "shield",
    },
  ],
  plans: [
    {
      name: "Starter VPS",
      description: "Perfect for small projects and websites",
      price: 9.99,
      type: "vps",
      popular: false,
      features: ["1 vCPU Core", "2GB RAM", "20GB SSD Storage", "1TB Bandwidth", "24/7 Support"],
    },
    {
      name: "Pro VPS",
      description: "Ideal for growing businesses",
      price: 29.99,
      type: "vps",
      popular: true,
      features: [
        "2 vCPU Cores",
        "4GB RAM",
        "50GB SSD Storage",
        "3TB Bandwidth",
        "24/7 Priority Support",
        "Free Domain",
      ],
    },
    {
      name: "Dedicated Server",
      description: "For high-traffic applications",
      price: 99.99,
      type: "servers",
      popular: false,
      features: [
        "8 CPU Cores",
        "16GB RAM",
        "500GB SSD Storage",
        "Unlimited Bandwidth",
        "24/7 Premium Support",
        "Free Domain",
        "DDoS Protection",
      ],
    },
  ],
  footerLinks: [
    {
      title: "Products",
      links: [
        { name: "VPS Hosting", href: "/buy/vps" },
        { name: "Dedicated Servers", href: "/buy/servers" },
        { name: "Managed Hosting", href: "/buy" },
        { name: "Cloud Storage", href: "/buy" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Blog", href: "/blog" },
        { name: "Discussions", href: "/discussions" },
        { name: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
    },
  ],
}
