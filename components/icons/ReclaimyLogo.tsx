import Image from "next/image";

export const ReclaimlyLogo = ({ className = "" }: { className?: string }) => {
	return (
		<Image src="/assets/images/logo-icon.svg" alt="Logo" width={32} height={32} />
	);
};
