import React from "react";
import prisma from "@/lib/prisma";
import { Mail, Calendar, User, MessageSquare } from "lucide-react";

export default async function InquiriesPage() {
  const inquiries = await prisma.contactInquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Direct Inquiries</h1>
        <p className="text-slate-500">View and manage messages from your contact form.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Inquiry Details</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Subject</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiries.length > 0 ? (
                inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{inquiry.name}</p>
                          <p className="text-xs text-slate-500">{inquiry.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {inquiry.subject}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <button className="text-accent font-bold text-sm hover:underline">View Message</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-slate-400">
                    <Mail className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No inquiries found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Preview Section (Optional for future enhancement) */}
      <div className="grid grid-cols-1 gap-8">
        {inquiries.slice(0, 3).map((inquiry) => (
          <div key={inquiry.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-accent" />
                <h3 className="font-bold text-slate-900">{inquiry.subject}</h3>
              </div>
              <span className="text-xs text-slate-400">{new Date(inquiry.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100">
              "{inquiry.message}"
            </p>
            <div className="flex items-center gap-4 text-xs">
              <span className="font-bold text-slate-900">{inquiry.name}</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">{inquiry.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
