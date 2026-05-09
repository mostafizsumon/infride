import { 
  ScrollText, 
  ShieldCheck, 
  Info, 
  Scale, 
  ArrowRight,
  Handshake,
  AlertOctagon,
  LifeBuoy
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const policies = [
  { 
    id: '1', 
    title: 'Monthly Deposit Rules', 
    icon: <ShieldCheck className="text-emerald-600" />,
    content: 'Each shareholder must deposit 5,000 BDT within the 10th of every month. Failure to do so will attract a late fine specified in the fine policy section. Deposits should preferably be made via bank transfer or office cash counter.' 
  },
  { 
    id: '2', 
    title: 'Fine Policy', 
    icon: <AlertOctagon className="text-rose-600" />,
    content: 'A late fine of 200 BDT per week will be applicable for deposits made after the 10th. For every month missed, a cumulative fine of 500 BDT will be added to the account balance.' 
  },
  { 
    id: '3', 
    title: 'Investment & Withdrawal', 
    icon: <Scale className="text-indigo-600" />,
    content: 'Shareholders can only withdraw their primary investment after a lock-in period of 24 months. For emergency withdrawals, a 10% penalty on the total installment amount will be deducted. All major investment projects must be approved by the majority shareholders.' 
  },
  { 
    id: '4', 
    title: 'Profit Distribution', 
    icon: <Handshake className="text-amber-600" />,
    content: 'Net profits from projects will be distributed equally among active shareholders after deducting operational costs and community reserve funds (usually 5%). Payments are made quarterly.' 
  },
];

export default function Policies() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Community Policies</h2>
          <p className="text-slate-500 font-medium">Rules and regulations governing the INFRIDE community.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 p-8 border-b border-slate-50">
               <div className="flex items-center gap-4">
                 <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-primary">
                    <ScrollText size={32} />
                 </div>
                 <div>
                   <CardTitle className="text-2xl font-black tracking-tight">Code of Conduct</CardTitle>
                   <CardDescription className="text-sm font-medium">Last updated: January 2026</CardDescription>
                 </div>
               </div>
            </CardHeader>
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="space-y-4">
                {policies.map((p) => (
                  <AccordionItem key={p.id} value={p.id} className="border-slate-100 rounded-2xl border px-4 overflow-hidden">
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-center gap-4 text-left">
                        <div className="p-2 bg-slate-50 rounded-lg">{p.icon}</div>
                        <span className="font-bold text-slate-700 text-lg">{p.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pt-2 text-slate-600 leading-relaxed font-medium pl-14">
                      {p.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <Card className="border-none shadow-xl shadow-indigo-100/30 rounded-3xl bg-indigo-600 text-white overflow-hidden p-8">
              <LifeBuoy size={48} className="mb-6 opacity-30" />
              <h3 className="text-xl font-black tracking-tight mb-4">Need Clarification?</h3>
              <p className="text-sm font-medium text-indigo-100 leading-relaxed mb-8">
                If you have any questions regarding the community rules or if a specific situation is not covered here, please reach out to the management via the support channel.
              </p>
              <Button className="w-full bg-white text-indigo-600 font-bold rounded-xl h-12 gap-2 hover:bg-indigo-50 border-none transition-all">
                Contact Support
                <ArrowRight size={18} />
              </Button>
           </Card>

           <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 flex items-start gap-4">
              <Info className="text-amber-500 mt-1 shrink-0" size={24} />
              <div>
                <h5 className="font-bold text-amber-900 text-sm">Transparency Notice</h5>
                <p className="text-xs font-semibold text-amber-700/70 mt-1">These policies are subject to change based on shareholder voting and community leadership decisions.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
