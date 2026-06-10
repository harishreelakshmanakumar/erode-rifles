# Task 2-b: Home Page Section Components

## Agent: 2-b

## What was done
Created all 8 home page section components for the Erode Rifles e-commerce website.

## Files Created
1. `src/components/home/Hero.jsx`
2. `src/components/home/FeaturedProducts.jsx`
3. `src/components/home/CategoryGrid.jsx`
4. `src/components/home/WhyChooseUs.jsx`
5. `src/components/home/TrainingCTA.jsx`
6. `src/components/home/UpcomingEvents.jsx`
7. `src/components/home/ReviewsSection.jsx`
8. `src/components/home/ContactCTA.jsx`

## Design Decisions
- All components use "use client" directive
- Strict design system: white backgrounds, black text (#111111), green (#B8D63C) accents only
- `font-heading` class used for all section headings (maps to Bebas Neue)
- `text-erode-black`, `bg-erode-green`, `text-erode-green` custom Tailwind classes used
- Navigation uses `useRouter()` from `@/context/RouterContext` with `navigate()` method
- Price formatting: `₹${price.toLocaleString("en-IN")}`
- Icon mapping in WhyChooseUs: Shield→Shield, Award→Award, Tag→Tag, Heart→Heart, Check→CheckCircle
- Events section has interactive filter tabs with active state highlighting
- All grids are responsive (mobile-first approach)
- No gradients, no colored shadows used anywhere

## Dependencies
- `@/data/mockData` — products, categories, events, reviews, whyChooseUs
- `@/context/RouterContext` — useRouter()
- `lucide-react` — ArrowRight, Shield, Award, Tag, Heart, CheckCircle, Calendar, Clock, MapPin, Star
