
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { ScenarioCategory, scenarioCategories } from "@/data/scenarioCategories";

interface ScenarioCategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (id: string) => void;
  onNewScenario: () => void;
}

const ScenarioCategories = ({
  selectedCategory,
  onSelectCategory,
  onNewScenario,
}: ScenarioCategoriesProps) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-4">
        Select a category to explore scenarios related to that financial topic.
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        {scenarioCategories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectCategory(category.id)}
            className={`p-3 rounded-lg text-left transition-all ${
              selectedCategory === category.id
                ? "ring-2 ring-finance-blue"
                : "hover:bg-gray-50"
            }`}
          >
            <Badge className={category.color + " mb-2"}>
              {category.name}
            </Badge>
            <p className="text-xs text-gray-600">{category.description}</p>
          </motion.button>
        ))}
      </div>
      
      {selectedCategory && (
        <Button 
          onClick={onNewScenario}
          variant="outline" 
          className="w-full mt-4"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Generate New Scenario
        </Button>
      )}
    </div>
  );
};

export default ScenarioCategories;
