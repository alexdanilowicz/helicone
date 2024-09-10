import { Card } from "@/components/ui/card";
import { Col } from "@/components/common/col";
import { Row } from "@/components/common/row";
import { CheckIcon } from "@heroicons/react/24/outline";
import { FeatureItem } from "./FeaturedItem";

const FreeCard: React.FC = () => {
  return (
    <Card className="p-[24px] bg-[#F9F9F9] h-[500px]">
      <Col className="h-full justify-between">
        <Col className="gap-[24px]">
          <div className="px-[12px] py-[6px] font-medium border-2 border-[#E2E8F0] w-fit rounded-[4px] bg-[#F9F9F9]">
            Developer
          </div>
          <Col className="gap-[8px]">
            <h3 className="text-[36px] font-bold">Free</h3>
            <h4 className="text-[16px] text-gray-500">
              Everything to <b>kickstart your AI project</b>.
            </h4>
          </Col>
        </Col>
        <Col className="gap-[16px] ">
          <FeatureItem
            title="Generous free monthly tier"
            description="10k free requests/month."
          />
          <FeatureItem
            title="Access to Dashboard"
            description="Watch your AI app improve."
          />
          <FeatureItem
            title="Free, truly."
            description="No credit card required."
          />
        </Col>
        <button className="bg-[#FFFFFF] text-black py-[12px] border rounded-[4px] mt-[8px] text-[16px] font-semibold shadow">
          Start for free
        </button>
      </Col>
    </Card>
  );
};

export default FreeCard;
