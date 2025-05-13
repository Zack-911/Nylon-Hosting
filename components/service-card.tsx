import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"
import styles from "./service-card.module.css"

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  features: string[]
  price: string
  period?: string
  ctaText?: string
  popular?: boolean
  iconColor?: string
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  features,
  price,
  period = "/month",
  ctaText = "Get Started",
  popular = false,
  iconColor = "text-purple-500",
}: ServiceCardProps) {
  const getIconColorClass = () => {
    switch (iconColor) {
      case "text-purple-500":
        return styles.iconPurple
      case "text-blue-500":
        return styles.iconBlue
      case "text-yellow-500":
        return styles.iconYellow
      case "text-green-500":
        return styles.iconGreen
      default:
        return styles.iconPurple
    }
  }

  return (
    <Card className={`${styles.card} ${popular ? styles.cardHighlighted : ""}`}>
      {popular && (
        <div className={styles.popularBadge}>
          <Badge className="gradient-purple-blue text-white border-0">Most Popular</Badge>
        </div>
      )}
      <CardHeader className={styles.cardHeader}>
        <Icon className={`${styles.icon} ${getIconColorClass()}`} />
        <CardTitle className={styles.title}>{title}</CardTitle>
        <CardDescription className={styles.description}>{description}</CardDescription>
        <div className={styles.pricing}>
          <span className={styles.price}>{price}</span>
          <span className={styles.period}>{period}</span>
        </div>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <ul className={styles.featuresList}>
          {features.map((feature, index) => (
            <li key={index} className={styles.featureItem}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.featureIcon}
              >
                <polyline points="9 11 12 14 22 4"></polyline>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className={styles.cardFooter}>
        <Button className="w-full gradient-purple-blue gradient-purple-blue-hover">{ctaText}</Button>
      </CardFooter>
    </Card>
  )
}
