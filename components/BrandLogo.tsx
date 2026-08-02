import Image from "next/image";

type Props = {
  size?: number;
  className?: string;
  priority?: boolean;
};

/** SMF Shop mark — replace `/public/brand/smf-logo.svg` with the official asset anytime. */
export function BrandLogo({ size = 36, className = "brand-mark", priority }: Props) {
  return (
    <Image
      src="/brand/smf-logo.svg"
      alt="SMF Shop"
      width={size}
      height={size}
      className={className}
      priority={priority}
    />
  );
}
